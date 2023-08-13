class Game {
  constructor() {}
 
  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  
  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;

    cars = [car1, car2];

    fuelgp = new Group();
    coingp = new Group();
    this.addSprites(fuelgp, 10, fuel_img, 0.05);
    this.addSprites(coingp, 20, coin_img, 0.05);

  }

  addSprites( group, number_of_sprites, image, scale)  
    {
      for (var h; h<number_of_sprites; h++)
      {
        var x,y ;
        x = random(width / 2 + 150, width / 2 - 150 );
        y = random(-height * 4.5, height - 400); 
        var sprite = createSprite(x,y);
        sprite.addImage("spriteImg", image);
        sprite.scale  = scale;
        group.add(sprite);
      }
    }
  
  handleElements() {
    form.hide();
    form.titleImg.position(10, 50);
    form.titleImg.class("gameTitleAfterEffect");
  }

 
  play() {
    this.handleElements();

    Player.getPlayersInfo(); //added
    
    if (allPlayers !== undefined) {
      image(track, 0, -height * 5, width, height * 6);

      //index of the array
      var index = 0;
      for (var plr in allPlayers) {
         //add 1 to the index for every loop
        index = index + 1;
        //use data form the database to display the cars in x and y direction
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        cars[index - 1].position.x = x;
        cars[index - 1].position.y = y;

        if (index === player.index){
          stroke(8);
          fill ("blue");
          ellipse(x,y, 100, 100);
          this.fuel_score(index);
          this.coin_score(index);
          // changing the game camera following the car
          camera.position.x = width/2;
          camera.position.y = cars[index-1].position.y ;
          
        }

      }

      // handling keyboard events
      if (keyIsDown(UP_ARROW)) {
        player.positionY += 10;
        player.update();
      }
 
      drawSprites();
    }
  }
    fuel_score(index)
  {
  cars[index-1].overlap ( fuelgp, function(collector, collected)
  {
   player.fuel = 185;
    player.update();
    collected.remove(); 
     } 
    ) 
  }
   coin_score(index)
   {
    cars[index-1].overlap ( coingp, function(collector, collected)
    {
      player.score += 300;
      player.update();
      collected.remove(); 
       } 
      ) 
   }

}

