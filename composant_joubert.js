function Livre()
{
  this.title = '';
  this.link = '';
  this.publishedDate = '';
  this.description = '';
  this.thumbnail = '';
}

Vue.component('nom',{
  props:['nom'],
  template:'<p>Nom de l"auteur : <strong>{{nom}}</strong></p>'
});

new Vue({
  el:'#tuto',
  data:{nomSaisi:"",
  items: []
},
methods: {
  searchBook: function () {
    if(this.nomSaisi != '') {
      axios.get('https://www.googleapis.com/books/v1/volumes?q=inauthor:'+this.nomSaisi).then(response => {
        this.results = response.data;
        var tmp_items = [];

        this.results.items.forEach(function(element) {
          var title_var = (typeof element.volumeInfo.title != 'undefined') ? element.volumeInfo.title : '';
          var link_var = (typeof element.saleInfo.buyLink != 'undefined') ? element.saleInfo.buyLink : '';
          var publishedDate_var = (typeof element.volumeInfo.publishedDate != 'undefined') ? element.volumeInfo.publishedDate : '';
          var description_var = (typeof element.volumeInfo.description != 'undefined') ? element.volumeInfo.description : '';
          var thumbnail_var = (typeof element.volumeInfo.imageLinks != 'undefined') ? element.volumeInfo.imageLinks.smallThumbnail : '';
          var livre = new Livre();

          if(description_var === " ")
          {
            console.log("pas de description")
            description_var = "Pas de description"
          }

          book = {  title: title_var,
            link: link_var,
            publishedDate: publishedDate_var,
            description: description_var,
            thumbnail: thumbnail_var
          };
          tmp_items.push(book);
        });
        this.items = tmp_items;
      });
    }
    else {
      alert('Erreur : Entrer un nom')
    }
  }
}
});
