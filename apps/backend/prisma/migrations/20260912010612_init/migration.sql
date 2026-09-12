-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis";

-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- CreateEnum
CREATE TYPE "RoleName" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'MAP_EDITOR', 'STAFF', 'STUDENT', 'VISITOR');

-- CreateEnum
CREATE TYPE "RoomType" AS ENUM ('CLASSROOM', 'LAB', 'FACULTY_ROOM', 'OFFICE', 'LIBRARY', 'AUDITORIUM', 'CANTEEN', 'WASHROOM', 'STORAGE', 'OTHER');

-- CreateEnum
CREATE TYPE "FacilityType" AS ENUM ('WASHROOM', 'DRINKING_WATER', 'CANTEEN', 'LIBRARY', 'AUDITORIUM', 'HELP_DESK', 'EMERGENCY_EXIT', 'FIRST_AID', 'ELEVATOR', 'STAIRCASE', 'RAMP', 'OTHER');

-- CreateEnum
CREATE TYPE "NavigationNodeType" AS ENUM ('ROOM_ENTRANCE', 'CORRIDOR_POINT', 'INTERSECTION', 'STAIR_ENTRY', 'STAIR_EXIT', 'ELEVATOR_ENTRY', 'ELEVATOR_EXIT', 'BLOCK_ENTRANCE', 'CAMPUS_PATH', 'EMERGENCY_EXIT');

-- CreateEnum
CREATE TYPE "NavigationEdgeType" AS ENUM ('CORRIDOR', 'STAIRS', 'ELEVATOR', 'RAMP', 'OUTDOOR_PATH', 'BLOCK_CONNECTOR', 'ROOM_ENTRY');

-- CreateEnum
CREATE TYPE "ClosureTargetType" AS ENUM ('ROOM', 'FLOOR', 'BLOCK', 'EDGE', 'NODE', 'STAIRCASE', 'ELEVATOR');

-- CreateTable
CREATE TABLE "roles" (
    "id" TEXT NOT NULL,
    "name" "RoleName" NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blocks" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "geometry" geometry(Polygon, 3857),
    "centroid" geometry(Point, 3857),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "floors" (
    "id" TEXT NOT NULL,
    "block_id" TEXT NOT NULL,
    "floor_number" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "elevation_meters" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "floor_plan_geometry" geometry(Polygon, 3857),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "floors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "departments" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "office_room_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rooms" (
    "id" TEXT NOT NULL,
    "block_id" TEXT NOT NULL,
    "floor_id" TEXT NOT NULL,
    "department_id" TEXT,
    "room_number" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "RoomType" NOT NULL,
    "description" TEXT,
    "capacity" INTEGER,
    "is_accessible" BOOLEAN NOT NULL DEFAULT true,
    "is_restricted" BOOLEAN NOT NULL DEFAULT false,
    "geometry" geometry(Polygon, 3857),
    "entrance_point" geometry(Point, 3857),
    "center_point" geometry(Point, 3857),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "facilities" (
    "id" TEXT NOT NULL,
    "block_id" TEXT NOT NULL,
    "floor_id" TEXT NOT NULL,
    "room_id" TEXT,
    "name" TEXT NOT NULL,
    "type" "FacilityType" NOT NULL,
    "description" TEXT,
    "is_accessible" BOOLEAN NOT NULL DEFAULT true,
    "geometry" geometry(Geometry, 3857),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "facilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faculty_members" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "department_id" TEXT NOT NULL,
    "office_room_id" TEXT,
    "designation" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "faculty_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "navigation_nodes" (
    "id" TEXT NOT NULL,
    "block_id" TEXT NOT NULL,
    "floor_id" TEXT NOT NULL,
    "node_type" "NavigationNodeType" NOT NULL,
    "label" TEXT NOT NULL,
    "position" geometry(PointZ, 3857) NOT NULL,
    "is_accessible" BOOLEAN NOT NULL DEFAULT true,
    "is_restricted" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "navigation_nodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "navigation_edges" (
    "id" TEXT NOT NULL,
    "from_node_id" TEXT NOT NULL,
    "to_node_id" TEXT NOT NULL,
    "edge_type" "NavigationEdgeType" NOT NULL,
    "distance_meters" DOUBLE PRECISION NOT NULL,
    "estimated_time_seconds" INTEGER NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "is_accessible" BOOLEAN NOT NULL DEFAULT true,
    "is_restricted" BOOLEAN NOT NULL DEFAULT false,
    "is_bidirectional" BOOLEAN NOT NULL DEFAULT true,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "geometry" geometry(LineStringZ, 3857),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "navigation_edges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "closures" (
    "id" TEXT NOT NULL,
    "target_type" "ClosureTargetType" NOT NULL,
    "target_id" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "starts_at" TIMESTAMP(3),
    "ends_at" TIMESTAMP(3),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "closures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qr_location_markers" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "block_id" TEXT NOT NULL,
    "floor_id" TEXT NOT NULL,
    "navigation_node_id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "position" geometry(PointZ, 3857) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "qr_location_markers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "search_events" (
    "id" TEXT NOT NULL,
    "query" TEXT NOT NULL,
    "normalized_query" TEXT,
    "result_type" TEXT,
    "result_id" TEXT,
    "user_role" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "search_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "navigation_sessions" (
    "id" TEXT NOT NULL,
    "start_node_id" TEXT NOT NULL,
    "destination_node_id" TEXT NOT NULL,
    "route_distance_meters" DOUBLE PRECISION NOT NULL,
    "estimated_time_seconds" INTEGER NOT NULL,
    "accessibility_mode" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "navigation_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "action" TEXT NOT NULL,
    "entity_type" TEXT NOT NULL,
    "entity_id" TEXT,
    "before_json" JSONB,
    "after_json" JSONB,
    "ip_address" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "blocks_code_key" ON "blocks"("code");

-- CreateIndex
CREATE UNIQUE INDEX "floors_block_id_floor_number_key" ON "floors"("block_id", "floor_number");

-- CreateIndex
CREATE UNIQUE INDEX "departments_code_key" ON "departments"("code");

-- CreateIndex
CREATE INDEX "rooms_room_number_idx" ON "rooms"("room_number");

-- CreateIndex
CREATE UNIQUE INDEX "rooms_floor_id_room_number_key" ON "rooms"("floor_id", "room_number");

-- CreateIndex
CREATE INDEX "facilities_type_idx" ON "facilities"("type");

-- CreateIndex
CREATE UNIQUE INDEX "faculty_members_email_key" ON "faculty_members"("email");

-- CreateIndex
CREATE INDEX "navigation_edges_from_node_id_idx" ON "navigation_edges"("from_node_id");

-- CreateIndex
CREATE INDEX "navigation_edges_to_node_id_idx" ON "navigation_edges"("to_node_id");

-- CreateIndex
CREATE INDEX "closures_target_type_target_id_idx" ON "closures"("target_type", "target_id");

-- CreateIndex
CREATE UNIQUE INDEX "qr_location_markers_code_key" ON "qr_location_markers"("code");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "floors" ADD CONSTRAINT "floors_block_id_fkey" FOREIGN KEY ("block_id") REFERENCES "blocks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "departments" ADD CONSTRAINT "departments_office_room_id_fkey" FOREIGN KEY ("office_room_id") REFERENCES "rooms"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_block_id_fkey" FOREIGN KEY ("block_id") REFERENCES "blocks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_floor_id_fkey" FOREIGN KEY ("floor_id") REFERENCES "floors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "facilities" ADD CONSTRAINT "facilities_block_id_fkey" FOREIGN KEY ("block_id") REFERENCES "blocks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "facilities" ADD CONSTRAINT "facilities_floor_id_fkey" FOREIGN KEY ("floor_id") REFERENCES "floors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "facilities" ADD CONSTRAINT "facilities_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faculty_members" ADD CONSTRAINT "faculty_members_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faculty_members" ADD CONSTRAINT "faculty_members_office_room_id_fkey" FOREIGN KEY ("office_room_id") REFERENCES "rooms"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "navigation_nodes" ADD CONSTRAINT "navigation_nodes_block_id_fkey" FOREIGN KEY ("block_id") REFERENCES "blocks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "navigation_nodes" ADD CONSTRAINT "navigation_nodes_floor_id_fkey" FOREIGN KEY ("floor_id") REFERENCES "floors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "navigation_edges" ADD CONSTRAINT "navigation_edges_from_node_id_fkey" FOREIGN KEY ("from_node_id") REFERENCES "navigation_nodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "navigation_edges" ADD CONSTRAINT "navigation_edges_to_node_id_fkey" FOREIGN KEY ("to_node_id") REFERENCES "navigation_nodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qr_location_markers" ADD CONSTRAINT "qr_location_markers_navigation_node_id_fkey" FOREIGN KEY ("navigation_node_id") REFERENCES "navigation_nodes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
