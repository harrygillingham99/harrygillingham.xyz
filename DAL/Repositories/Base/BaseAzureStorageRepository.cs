using System.Collections.Concurrent;
using System.Text.Json;
using Azure;
using Azure.Data.Tables;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Serilog;

namespace harrygillingham.xyz.DAL.Repositories.Base
{
    public abstract class BaseAzureStorageRepo
        {
            private static readonly ConcurrentDictionary<string, string?> InitialisedRepos = new();
            private readonly TableClient _tableClient;
            private readonly BlobContainerClient _blobContainerClient;

            protected BaseAzureStorageRepo(string storageConnectionString, string tableName, TableClientOptions? options = null)
            {
                _tableClient = new TableClient(storageConnectionString, tableName, options);
                _blobContainerClient = new BlobContainerClient(storageConnectionString, tableName);

                if (!InitialisedRepos.TryAdd(tableName ?? throw new ArgumentNullException(nameof(tableName), "Repository cannot be initialised without a table name"), null)) return;
                _tableClient.CreateIfNotExists();
                _blobContainerClient.CreateIfNotExists();
            }

            protected static string InvertedTicks => $"{DateTime.MaxValue.Ticks - DateTime.UtcNow.Ticks:D19}";

            protected async Task<T> WithTableClient<T>(Func<TableClient, Task<T>> funcAsync)
            {
                try
                {
                    return await funcAsync(_tableClient);
                }
                catch (RequestFailedException exception)
                {
                    Log.Error(exception.Message, exception);
                    if (exception.Status == 404)
                    {
                        throw;
                    }
                    throw new Exception($"{GetType().FullName}.WithTableStore() error", exception);
                }
                catch (Exception ex)
                {
                    Log.Error("Error on table store operations", ex);
                    throw new Exception($"{GetType().FullName}.WithTableStore() error", ex);
                }
            }

            protected async Task<string> UploadBlob<T>(T payload, string key)
            {
                var blobClient = _blobContainerClient.GetBlobClient(key);
                var bytes = JsonSerializer.SerializeToUtf8Bytes(payload);
                using var stream = new MemoryStream(bytes);

                await blobClient.UploadAsync(stream, new BlobHttpHeaders { ContentType = "application/json" });

                return key;
            }

            protected async Task<T?> DownloadBlob<T>(string key)
            {
                var blobClient = _blobContainerClient.GetBlobClient(key);
                await using var stream = await blobClient.OpenReadAsync();
                return await JsonSerializer.DeserializeAsync<T>(stream);
            }
        }
}
