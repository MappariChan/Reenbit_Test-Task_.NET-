using System;
using System.IO;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Xml.Linq;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;
//using Microsoft.WindowsAzure.Storage.Blob;
//using Microsoft.WindowsAzure.Storage;
using System.Threading.Tasks;
using Azure.Storage.Blobs.Specialized;
using Microsoft.Azure.Storage.Blob;
using Microsoft.Azure.Storage;

namespace MyBlobTrigger
{
    [StorageAccount("AzureWebJobsStorage")]
    public class Function1
    {
        [FunctionName("Function1")]
        public void Run([BlobTrigger("container/{name}")] Stream myBlob, string name, ILogger log)
        {

            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(Environment.GetEnvironmentVariable("AzureWebJobsStorage"));
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
            CloudBlobContainer container = blobClient.GetContainerReference("container");

            // Retrieve a reference to the blob
            CloudBlockBlob blob = container.GetBlockBlobReference(name);

            // Retrieve the blob's metadata
            blob.FetchAttributes();
            string email = blob.Metadata["Email"];
            //Console.WriteLine("wgqwgq");

            //string email = myBlob.Metadata["Email"];

            string to = email; //To address    
            string from = "wantuchmatvii@gmail.com"; //From address    
            var message = new MailMessage(from, to);

            string mailbody = "Your file was succsessfully uploaded to blob storage!";
            message.Subject = "File Uploading";
            message.Body = mailbody;
            message.BodyEncoding = Encoding.UTF8;
            message.IsBodyHtml = true;
            var client = new SmtpClient("smtp.gmail.com", 587); //Gmail smtp    
            var basicCredential1 = new NetworkCredential(from, "bfhhenvhkuutxfcs");
            client.EnableSsl = true;
            client.UseDefaultCredentials = false;
            client.Credentials = basicCredential1;
            try
            {
                client.Send(message);
            }

            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
