-- Knowledge-base store for the AI learning assistant's retrieval step.
-- SourceId is informational only (not a foreign key) — every topic's rows are
-- wiped and rebuilt on each reindex, so nothing joins against it.
CREATE TABLE dbo.Lms_ContentEmbeddings (
  EmbeddingId INT IDENTITY(1,1) PRIMARY KEY,
  SubCategoryId INT NOT NULL,
  SourceType NVARCHAR(20) NOT NULL,
  SourceId INT NULL,
  ChunkText NVARCHAR(MAX) NOT NULL,
  Vector NVARCHAR(MAX) NOT NULL,
  UpdatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);

CREATE INDEX IX_Lms_ContentEmbeddings_SubCategory ON dbo.Lms_ContentEmbeddings(SubCategoryId);
