using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;
using WindowsClient.Models;

namespace WindowsClient
{
    /// <summary>
    /// Interaction logic for PostDetail.xaml
    /// </summary>
    public partial class PostDetail : Window
    {
        private Post _Post;

        public PostDetail()
        {
            InitializeComponent();
        }

        public async void FetchPost(Guid Id)
        {
            using var http = new HttpClient();

            try
            {
                string result = await http.GetStringAsync($"http://localhost:5000/api/post/{Id}");

                Post? post = JsonSerializer.Deserialize<Post>(result, new JsonSerializerOptions() { PropertyNameCaseInsensitive = true });

                if (post is null)
                {
                    MessageBox.Show("Error", "The requested post does not exist!", MessageBoxButton.OK, MessageBoxImage.Error);
                    Close();
                }
                else
                {
                    Title.Text = post.Title;
                    By.Text = $"By {post.AuthorName}";
                    Markdown.Markdown = post.Text;
                }
            }
            catch (HttpRequestException e)
            {
                MessageBox.Show("There was an error fetching the post!", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
                Close();
            }
        }
    }
}
