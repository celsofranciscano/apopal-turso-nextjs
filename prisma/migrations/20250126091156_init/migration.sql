-- CreateTable
CREATE TABLE "tbprivileges" (
    "PK_privilege" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "privilege" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);

-- CreateTable
CREATE TABLE "tbusers" (
    "PK_user" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FK_privilege" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "email" TEXT NOT NULL,
    "blockedUntil" DATETIME,
    "password" TEXT,
    "profileImage" TEXT,
    "lastLogin" DATETIME,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "tbusers_FK_privilege_fkey" FOREIGN KEY ("FK_privilege") REFERENCES "tbprivileges" ("PK_privilege") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "tbpartners" (
    "PK_partner" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "CI" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "birthdate" DATETIME,
    "phoneNumber" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);

-- CreateTable
CREATE TABLE "tblocations" (
    "PK_location" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FK_partner" INTEGER NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "description" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "tblocations_FK_partner_fkey" FOREIGN KEY ("FK_partner") REFERENCES "tbpartners" ("PK_partner") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "tbprices" (
    "PK_price" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "min_cubes" INTEGER NOT NULL,
    "max_cubes" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "fixed_price" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);

-- CreateTable
CREATE TABLE "tbwaterreadings" (
    "PK_reading" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FK_partner" INTEGER NOT NULL,
    "previousReading" INTEGER NOT NULL,
    "currentReading" INTEGER NOT NULL,
    "cubicMeters" INTEGER NOT NULL,
    "cubicCorrection" INTEGER,
    "maintenance" BOOLEAN NOT NULL DEFAULT false,
    "readingMonth" DATETIME NOT NULL,
    "pricing" REAL,
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "tbwaterreadings_FK_partner_fkey" FOREIGN KEY ("FK_partner") REFERENCES "tbpartners" ("PK_partner") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "tbpayments" (
    "PK_payment" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FK_partner" INTEGER NOT NULL,
    "amount" REAL NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Pendiente',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "tbpayments_FK_partner_fkey" FOREIGN KEY ("FK_partner") REFERENCES "tbpartners" ("PK_partner") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "tbpayment_details" (
    "PK_detail" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FK_payment" INTEGER NOT NULL,
    "FK_reading" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "tbpayment_details_FK_payment_fkey" FOREIGN KEY ("FK_payment") REFERENCES "tbpayments" ("PK_payment") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tbpayment_details_FK_reading_fkey" FOREIGN KEY ("FK_reading") REFERENCES "tbwaterreadings" ("PK_reading") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "tbactivitytypes" (
    "PK_activityType" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "activityType" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);

-- CreateTable
CREATE TABLE "tbactivities" (
    "PK_activity" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FK_activityType" INTEGER NOT NULL,
    "activityName" TEXT NOT NULL,
    "activityDate" DATETIME NOT NULL,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL,
    "location" TEXT,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "tbactivities_FK_activityType_fkey" FOREIGN KEY ("FK_activityType") REFERENCES "tbactivitytypes" ("PK_activityType") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "tbattendances" (
    "PK_attendance" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FK_partner" INTEGER NOT NULL,
    "FK_activity" INTEGER NOT NULL,
    "attendanceDate" DATETIME,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "tbattendances_FK_partner_fkey" FOREIGN KEY ("FK_partner") REFERENCES "tbpartners" ("PK_partner") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tbattendances_FK_activity_fkey" FOREIGN KEY ("FK_activity") REFERENCES "tbactivities" ("PK_activity") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "tbpermissions" (
    "PK_permission" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FK_attendance" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pendiente',
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);

-- CreateTable
CREATE TABLE "tbincometypes" (
    "PK_incometype" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "incomeType" TEXT NOT NULL,
    "pricing" REAL NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);

-- CreateTable
CREATE TABLE "tbexpensetypes" (
    "PK_expensetype" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "expenseType" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);

-- CreateIndex
CREATE UNIQUE INDEX "tbprivileges_privilege_key" ON "tbprivileges"("privilege");

-- CreateIndex
CREATE UNIQUE INDEX "tbusers_email_key" ON "tbusers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tbpartners_code_key" ON "tbpartners"("code");
