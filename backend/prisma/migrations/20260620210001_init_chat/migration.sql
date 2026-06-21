BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[chats] (
    [id] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [chats_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[chat_messages] (
    [id] NVARCHAR(1000) NOT NULL,
    [chatId] NVARCHAR(1000) NOT NULL,
    [role] NVARCHAR(1000) NOT NULL,
    [content] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [chat_messages_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [chat_messages_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [chat_messages_chatId_createdAt_idx] ON [dbo].[chat_messages]([chatId], [createdAt]);

-- AddForeignKey
ALTER TABLE [dbo].[chat_messages] ADD CONSTRAINT [chat_messages_chatId_fkey] FOREIGN KEY ([chatId]) REFERENCES [dbo].[chats]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
