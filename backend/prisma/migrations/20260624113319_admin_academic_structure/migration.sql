/*
  Warnings:

  - A unique constraint covering the columns `[registrationNumber]` on the table `StudentProfile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "StudentStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'BLOCKED');

-- CreateEnum
CREATE TYPE "FacultyStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'BLOCKED');

-- CreateEnum
CREATE TYPE "HodStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'BLOCKED');

-- AlterTable
ALTER TABLE "FacultyProfile" ADD COLUMN     "status" "FacultyStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "HodProfile" ADD COLUMN     "status" "HodStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "StudentProfile" ADD COLUMN     "programId" TEXT,
ADD COLUMN     "registrationNumber" TEXT,
ADD COLUMN     "sectionId" TEXT,
ADD COLUMN     "semesterId" TEXT,
ADD COLUMN     "status" "StudentStatus" NOT NULL DEFAULT 'ACTIVE';

-- CreateTable
CREATE TABLE "Program" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "departmentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Semester" (
    "id" TEXT NOT NULL,
    "semesterNumber" INTEGER NOT NULL,
    "programId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Semester_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Section" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "semesterId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Program_name_key" ON "Program"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Program_code_key" ON "Program"("code");

-- CreateIndex
CREATE INDEX "Program_departmentId_idx" ON "Program"("departmentId");

-- CreateIndex
CREATE INDEX "Semester_programId_idx" ON "Semester"("programId");

-- CreateIndex
CREATE UNIQUE INDEX "Semester_programId_semesterNumber_key" ON "Semester"("programId", "semesterNumber");

-- CreateIndex
CREATE INDEX "Section_semesterId_idx" ON "Section"("semesterId");

-- CreateIndex
CREATE UNIQUE INDEX "Section_semesterId_name_key" ON "Section"("semesterId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "StudentProfile_registrationNumber_key" ON "StudentProfile"("registrationNumber");

-- CreateIndex
CREATE INDEX "StudentProfile_programId_idx" ON "StudentProfile"("programId");

-- CreateIndex
CREATE INDEX "StudentProfile_semesterId_idx" ON "StudentProfile"("semesterId");

-- CreateIndex
CREATE INDEX "StudentProfile_sectionId_idx" ON "StudentProfile"("sectionId");

-- AddForeignKey
ALTER TABLE "StudentProfile" ADD CONSTRAINT "StudentProfile_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentProfile" ADD CONSTRAINT "StudentProfile_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentProfile" ADD CONSTRAINT "StudentProfile_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Semester" ADD CONSTRAINT "Semester_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE CASCADE ON UPDATE CASCADE;
