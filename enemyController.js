 #pragma strict

 var enemy : GameObject;
 var player : GameObject;
 private var range : float;
 var speed : float;
 
 
 function Start ()
 {
     enemy = GameObject.FindWithTag("enemy");
     player = GameObject.FindWithTag("player");
 }
 
 
 function FixedUpdate ()
 {

     // enemy follows player
     range = Vector2.Distance(enemy.transform.position, player.transform.position);
     if(range <= 5f)
     {
         transform.position += (player.transform.position - enemy.transform.position).normalized * speed * Time.fixedDeltaTime;
     }
 }