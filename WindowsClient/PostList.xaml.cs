using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Text.Json;
using WindowsClient.Models;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Text.RegularExpressions;

namespace WindowsClient
{
    /// <summary>
    /// Interaction logic for PostList.xaml
    /// </summary>
    public partial class PostList : UserControl
    {
        private IEnumerable<Post> _Posts;

        public IEnumerable<Post> Posts { get => _Posts; set
            {
                _Posts = Posts;
            } }
        
        public PostList()
        {
            InitializeComponent();

            FetchPosts();
        }

        private async void FetchPosts()
        {
            using (HttpClient http = new HttpClient())
            {
                try
                {
                    string result = await http.GetStringAsync("http://localhost:5000/api/post");

                    IEnumerable<Post> posts = JsonSerializer.Deserialize<IEnumerable<Post>>(result, new JsonSerializerOptions() { PropertyNameCaseInsensitive = true });

                    ItemsControl.Items.Clear();

                    foreach (var post in posts)
                    {
                        post.Text = Regex.Replace(post.Text, "#+ ", " ");
                        post.Text = Regex.Replace(post.Text, "!\\[[^\\]]*\\]\\([^\\(]*\\)", " ");
                        post.Text = Regex.Replace(post.Text, "\n", " ");

                        var card = new PostCard();
                        card.setPost(post);
                        ItemsControl.Items.Add(card);
                    }
                }
                catch (HttpRequestException e)
                {
                    MessageBox.Show("There was an error fetching the posts", "Error!", MessageBoxButton.OK, MessageBoxImage.Error);
                    Application.Current.Shutdown();
                }
            }
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            FetchPosts();
        }
    }
}
