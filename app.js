'use strict';
angular.module('application', [])
.controller('myCtrl', ['$scope', '$http', function($scope, $http){
  $scope.articles = function() {
    $http.get('https://www.googleapis.com/blogger/v3/blogs/706779964448343235/posts?key=AIzaSyBTZ_Yvff_AwcY9LqeFDhxY_Z5jzmqzgIw').then(function(response){
      $scope.data = generatePostsList(response.data["items"]);
    });
  };

  $scope.aboutUs = function() {
    $http.get('https://www.googleapis.com/blogger/v3/blogs/706779964448343235/pages/2134154694253275376?key=AIzaSyBTZ_Yvff_AwcY9LqeFDhxY_Z5jzmqzgIw').then(function(response){
      $scope.page = $(response.data["content"]).text();
    })
  };

  $scope.search = function(query) {
    query = query || $scope.query;
    $http.get('https://www.googleapis.com/blogger/v3/blogs/706779964448343235/posts/search?q=' + query + '&key=AIzaSyBTZ_Yvff_AwcY9LqeFDhxY_Z5jzmqzgIw').then(function(response){
      if(query == "comics"){
        $scope.comics = filterComics(response.data["items"]);
      } else {
        $scope.results = generatePostsList(response.data["items"]);
      }
    });
  };

  function generatePostsList(bigArr){
    var text = getText(bigArr);
    var title = getTitles(bigArr);
    var postList = [];

    for(var i = 0;i < bigArr.length;i++){
      postList.push({title: title[i], text: text[i]});
    }
    return postList;
  };

  function filterComics(searchArr){
    var comicArr = [];
    for(var i =0;i < searchArr.length; i++){
      var content = searchArr[i]["content"];
      var content = $(content).find('a img').attr("src");
      if(searchArr[i]["labels"].indexOf("Comics") != -1){
        comicArr.push({title: searchArr[i]["title"], img: content});
      }
    }
    return comicArr;
  }

  function getText(arr){
    var newArr = [];
    for(var i = 0; i < arr.length; i++){
      var text = $(arr[i]["content"]).text();
      newArr.push(text);
    }
    return newArr;
  };

  function getTitles(arr){
    var newArr = [];
    for(var i = 0; i < arr.length; i++){
      var title = arr[i]["title"];
      newArr.push(title);
    }
    return newArr;
  };
}])
.filter('search', function(){});


