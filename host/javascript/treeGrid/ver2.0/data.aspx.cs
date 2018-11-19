using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebApplication1
{
    public partial class dirs : System.Web.UI.Page
    {
        public String json {set ; get ;}
        protected void Page_Load(object sender, EventArgs e){
        
            Response.AppendHeader("Access-Control-Allow-Origin", "*");
    
            DirectoryInfo di = new DirectoryInfo("C:\\zmm");

            FileDirectory root = new FileDirectory();
            root.title = di.Name;
            root.lastUpdate = di.LastWriteTime.ToString();
            loop(di, root);
            
            this.json = JsonConvert.SerializeObject(root);
        }
        private void loop(DirectoryInfo di, FileDirectory root)
        {
            foreach (FileInfo fi in di.GetFiles())
            {
                FileDirectory fd = new FileDirectory();
                fd.title = fi.Name;
                fd.lastUpdate = fi.LastWriteTime.ToString();
                root.children.Add(fd);
            }
            foreach(DirectoryInfo dichild in di.GetDirectories()){

                FileDirectory fd = new FileDirectory();
                fd.title = dichild.Name;
                fd.lastUpdate = dichild.LastWriteTime.ToString();
                root.children.Add(fd);

                loop(dichild, fd);
            }
        }
    }

    public class FileDirectory
    {
        public String title { get; set; }
        public String lastUpdate { get; set; }
        public List<FileDirectory> children { get; set; }
        public FileDirectory()
        {
            this.children = new List<FileDirectory>();
        }
    }
}