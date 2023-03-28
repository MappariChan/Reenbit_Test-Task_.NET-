using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;
using System.Net;
using System.Text;
using first_task.DataObjects;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;

namespace first_task.Controllers
{
    [Route("/post")]
    public class FormController : Controller
    {
        [HttpPost]
        public void method(FormData myData)
        {

            string key = "DefaultEndpointsProtocol=https;AccountName=blobstoragematvii;AccountKey=D3W1fh4jM+zDPwIY3g559HNx16V1lSyIHEPYXPrpgSVRgfqkXwH+YbVjH35aFQsC4MX9srtWAXQY+ASt4KujPA==;EndpointSuffix=core.windows.net";

            Stream stream = myData.File.OpenReadStream();

            var blobServiceClient = new BlobServiceClient(key);
            var options = new BlobUploadOptions
            {
                Metadata = new Dictionary<string, string>
                {
                    { "Email", myData.Email }
                }
            };
            var container = blobServiceClient.GetBlobContainerClient("container");
            BlobClient blobClient = container.GetBlobClient(myData.File.FileName);
            blobClient.Upload(stream, options);
        }
    }
}
