using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Net.Http;
using System.IO;
using System.Net;
using Newtonsoft.Json;


namespace HerokuTest
{
    static class Program
    {
        /// <summary>
        /// アプリケーションのメイン エントリ ポイントです。
        /// </summary>
        [STAThread]
        static void Main()
        {
            string LoginUrl = "https://login.salesforce.com/services/oauth2/token";
            LoginUrl += "?grant_type=password";
            LoginUrl += "&client_id=3MVG9YDQS5WtC11qjSWvUz6NOzBunszGJC.VvdqCxkUyGYsTAmwUB_R33nZvyba5IePe2.UShom.ptdH0mxpo";
            LoginUrl += "&client_secret=2503084973416815406";
            LoginUrl += "&username=fff8965@xxx.com";
            LoginUrl += "&password=zmm@xxx";
            //the line below enables TLS1.1 and TLS1.2
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
            FormUrlEncodedContent content = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("grant_typ", "password"),
                new KeyValuePair<string, string>("client_id", "3MVG9YDQS5WtC11qjSWvUz6NOzBunszGJC.VvdqCxkUyGYsTAmwUB_R33nZvyba5IePe2.UShom.ptdH0mxpo"),
                new KeyValuePair<string, string>("client_secret", "2503084973416815406"),
                new KeyValuePair<string, string>("username", "fff8965@xxxm"),
                new KeyValuePair<string, string>("password", "zmm@xxx")
            });
            HttpResponseMessage response;
            using (HttpClient client = new HttpClient())
            {
                response = client.PostAsync(LoginUrl, content).Result;
            }
            var info = response.Content.ReadAsStringAsync().Result;
            Console.WriteLine(info);
            Console.WriteLine(response.StatusCode);
            Console.ReadLine();


            LoginInfo loginInfo = JsonConvert.DeserializeObject<LoginInfo>(info);


            String url = loginInfo.instance_url + "/services/data/v20.0/query/?q=SELECT+name+from+Account";


            using (HttpClient client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("Authorization", loginInfo.token_type + " " + loginInfo.access_token);
                response = client.GetAsync(url).Result;
            }
            var r = response.Content.ReadAsStringAsync().Result;

            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new Form1());

        }


        public class LoginInfo
        {
            public String access_token { get; set; }
            public String instance_url { get; set; }
            public String id { get; set; }
            public String token_type { get; set; }
            public String issued_at { get; set; }
            public String signature { get; set; }
        }
    }
}
