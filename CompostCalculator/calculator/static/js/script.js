api = angular.module('apiModule', ['ngResource']);

api.controller('AppController', [
  '$scope', '$http', function($scope, $http) {
    $scope.posts = {'compostables':[]};
    return $http.get('/calculator/items?format=json').then(function(result) {
      return angular.forEach(result.data, function(item) {
        return $scope.posts.compostables.push(item);
      });
    });
  }
]);

api.controller('RecipeController', [
  '$scope', '$http', function($scope, $http) {
    $scope.recipes = [];
    return $http.get('/calculator/recipes?format=json').then(function(result) {
      return angular.forEach(result.data, function(item) {
        return $scope.recipes.push(item);
      });
    });
  }
]);

api.factory('Compostable', [
  '$resource', function($resource) {
    return $resource('/calculator/items/:id', {
      id: '@id'
    });
  }
]);

api.factory('Recipe', [
  '$resource', function($resource) {
    return $resource('/calculator/recipes/:id', {
      id: '@id',
    });
  }
]);

app = angular.module('mainModule', ['apiModule', 'ui.bootstrap']);

app.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});

app.filter('nitrogenRich', function() {
  return function( posts ) {
    var filteredList = [];
    for (var i = 0; i < posts.length; i++) {
      if (posts[i].carbon/posts[i].nitrogen < 30) {
        filteredList.push(posts[i]);
      };
    };
    return filteredList;
  };
});

app.filter('carbonRich', function() {
  return function( posts ) {
    var filteredList = [];
    for (var i = 0; i < posts.length; i++) {
      if (posts[i].carbon/posts[i].nitrogen > 30) {
        filteredList.push(posts[i]);
      };
    };
    return filteredList;
  };
});

app.filter('mineOrSuggest', function() {
  return function( posts, currentUser ) {
    var filteredList = [];
    for (var i = 0; i < posts.length; i++) {

      if (Number(posts[i].creator) === Number(currentUser()) || posts[i].suggested === true) {
        filteredList.push(posts[i]);
      };
    };
    return filteredList;
  };
});

app.controller('GridController', [
  '$scope', 'Recipe', 'Compostable', function($scope, Recipe, Compostable) {
  // $scope.posts = {};
  // $scope.posts['compostables'] = [];
  $scope.chosen = [];
  $scope.totalVol = 0;
  $scope.totalWeight = 0;
  $scope.newRecipe = new Recipe();
  $scope.newCompostable = new Compostable();

  $scope.saveCompostable = function() {
    $scope.newCompostable.creator = $scope.currentUser();
    return $scope.newCompostable.$save()
      .then(function(result) {
        return $scope.$parent.posts.compostables.push(result);
      })
      .then(function() {
        return $scope.newCompostable = new Compostable();
      })
      .then(function() {
        alert("Compostable Added!");
        $scope.$apply();
        // $scope.$parent.posts.compostables.$apply();
        return $scope.errors = null;
      }, function(rejection) {
        $scope.loginErr(rejection.data);
        return $scope.errors = rejection.data;
      });
  };

  $scope.loginErr = function(data) {
    if (String(data.creator) === "This field is required.") {
      alert("Sorry, you must login to save!");
    } else if (String(data.title) === "Compost item with this Title already exists.") {
      alert("This Title is already in use. Please choose another name.")
    } else {
      alert("There's been a grave mistake!");
    };
  };

  $scope.saveRecipe = function() {
    chosen = $scope.chosen;
    json = JSON.stringify(chosen);
    $scope.newRecipe.chosen = json;
    $scope.newRecipe.creator = $scope.currentUser();
    return $scope.newRecipe.$save().then(function(result) {
      return $scope.recipes.push(result);
    }).then(function() {
      return $scope.newRecipe = new Recipe();
    }).then(function() {
      return $scope.errors = null;
    }, function(rejection) {
      return $scope.errors = rejection.data;
    });
  };

  $scope.clear = function() {
    $scope.chosen = [];
    $scope.calculateTotals(false)
  };

  $scope.currentUser = function() {
    return document.getElementById("userID").innerHTML;
  };

  $scope.notInList = function(post) {
    for (i = 0; i < $scope.chosen.length; i++) {
      if ($scope.chosen[i].title === post.title) {
        return false;
      };
    };
    return true;
  }

  $scope.finishWith = function(post) {
    tot = totalVol.innerHTML;
    carb = totalCarbon.innerHTML;
    nitro = totalNitrogen.innerHTML;
    numer = Number(tot*((carb/nitro)-30));
    bot = post.carbon/post.nitrogen;
    voltwo = (numer/(30-bot))/post.nitrogen;
    voltwo=Math.round(voltwo)
    $scope.chosen.push(post);
    post['vol'] = voltwo;
    $scope.calculateTotals(true);
  };

  $scope.addChosen = function(post,elementID) {
    if ($scope.notInList(post)) {
      if (document.getElementById(elementID).checked) {
        $scope.finishWith(post);
      } else {
        post.vol = null;
        $scope.chosen.push(post);
        $scope.totalWeight += post.weight;
        $scope.totalVol += post.vol;
        return true;
      }
    } else {
        alert("You've already added that item.");
        return false;
    };
  };

  $scope.calculateTotals = function(fromDB) {
    var total = 0, totalCarbon = 0, totalNitrogen = 0, vol = 0;

    for (i = 0; i < $scope.chosen.length; i++) {
        if (fromDB) {
          vol = $scope.chosen[i]['vol'];
        } else {
          vol = Number(document.getElementById(i+"Vol").value);
          if (vol === 0) {
            $scope.chosen[i]['vol'] = null;
          } else {
            $scope.chosen[i]['vol'] = vol;
          };
        };

        total += vol;
        totalNitrogen += Number($scope.chosen[i]['nitrogen'])*vol;
        totalCarbon += Number($scope.chosen[i]['carbon'])*vol;
    };
    $scope.handleFinalRatio(Math.round(totalCarbon/totalNitrogen));
    document.getElementById("totalCarbon").innerHTML = totalCarbon;
    document.getElementById("totalNitrogen").innerHTML = totalNitrogen;
    document.getElementById("totalVol").innerHTML = total;
  };


  $scope.handleFinalRatio = function(finalRatio) {
    if (finalRatio < 25) {
        document.getElementById("suggestion").innerHTML = "carbon rich";
        $scope.swapBorder('suggestNitrogen','suggestCarbon');
    } else if (finalRatio < 30) {
        document.getElementById("suggestion").innerHTML = "just a little carbon rich";
        $scope.swapBorder('suggestNitrogen','suggestCarbon');
    } else if (finalRatio > 35) {
        document.getElementById("suggestion").innerHTML = "nitrogen rich";
        $scope.swapBorder('suggestCarbon','suggestNitrogen');
    } else if (finalRatio > 30) {
        document.getElementById("suggestion").innerHTML = "just a little nitrogen rich";
        $scope.swapBorder('suggestCarbon','suggestNitrogen');
    } else if (finalRatio === 30) {
        document.getElementById("suggestion").innerHTML = "no more";
    } else if (isNaN(finalRatio)) {
        document.getElementById("suggestion").innerHTML = 0;
        finalRatio = 1;
    } else {
        document.getElementById("suggestion").innerHTML = "AHH there's a bug!!";
    }

    document.getElementById("ratio").innerHTML = finalRatio;
  }

   $scope.swapBorder = function(one, two) {
      document.getElementById(two).style.borderColor = '#523A05';
      document.getElementById(one).style.borderColor = '#5E88A2';
      document.getElementById(two+"Box").style.display = "block";
      document.getElementById(one+"Box").style.display = "none";
  }

  $scope.loadRecipe = function(recipe) {
    $scope.chosen = [];
    chosen = JSON.parse(recipe.chosen);
    $scope.chosen = chosen;
    $scope.calculateTotals(true)
  }

  $scope.myRecipes = function() {
    return function( recipe ) {
      return recipe.creator == $scope.currentUser();
    };
  };

  $scope.delete = function(choice) {
    $scope.chosen.remove(choice);
    $scope.calculateTotals(true);
  };

  $scope.hideHow = function() {
    document.getElementById("howTo").style.display = "none";
    document.getElementById("showHow").style.display = "block";
  };

  $scope.showHow = function() {
    document.getElementById("howTo").style.display = "block";
    document.getElementById("showHow").style.display = "none";
  };

  $scope.templateURL = {'url': "/calculator/heap"};
  $scope.loadURL = function(url) {
    $scope.templateURL.url = url;
    $scope.$parent.templateURL.url = url;
  };

}]);

// CODE FOR THE ADD COMPOSTABLE MODAL

app.controller('ModalDemoCtrl', function ($scope, $modal, $log) {

  $scope.items = ['item1', 'item2', 'item3'];

  $scope.openModal = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'modal.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});