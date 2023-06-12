using System;
using System.Collections.Generic;
using System.Linq;
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
using WindowsClient.Models;

namespace WindowsClient
{
    /// <summary>
    /// Interaction logic for PostCard.xaml
    /// </summary>
    public partial class PostCard : UserControl
    {
        private Post _Post;

        public PostCard()
        {
            InitializeComponent();
        }

        public void setPost(Post post) 
        {
            _Post = post;
            Title.Text = post.Title;
            Text.Text = post.Text;
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            PostDetail postDetail = new PostDetail();
            postDetail.FetchPost(_Post.Id);
            postDetail.Show();
        }
    }
}
