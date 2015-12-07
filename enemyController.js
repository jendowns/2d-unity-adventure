 #pragma strict

 var enemy : GameObject;
 var player : GameObject;
 var speed : float;
 var enemyAnim : Animator;
 var healthBar : Animator;
 var health : int = 600;
 
 private var range : float;
 
 var startBattleScene : boolean = false;
 
 
 function Start ()
 {
     enemy = GameObject.FindWithTag("enemy");
     player = GameObject.FindWithTag("player");
 }
 
 function Update()
 {
 	if(range <= 6f)
    	startBattleScene = true; 
 }
 
 function Hurt(){
 	health -= 100;
 	healthBar.SetTrigger("hit");
 	
 	if(health <= 0){
 		Die();
 	}
 }
 
 function Die(){
 	Destroy(this.gameObject);
 	player.GetComponent(playerController).OnEnemyDefeat();
 }
 
 
 function FixedUpdate ()
 {

     // enemy follows player
     range = Vector2.Distance(enemy.transform.position, player.transform.position);
     
     if(startBattleScene)
     {
		// Clear current animation, if any
		enemyAnim.SetBool("left",false);
		enemyAnim.SetBool("right",false);
		enemyAnim.SetBool("up",false);
		enemyAnim.SetBool("down",false);				  												
        
        // updating position
        
        var targetDirection : Vector2 = (player.transform.position - enemy.transform.position).normalized;
        
        transform.position += targetDirection * speed * Time.fixedDeltaTime;

		// updating animation
		
		var targetDirectionRotated : Vector2 = Quaternion.Euler(0,0,-45) * targetDirection;
		
		if(targetDirectionRotated.x > 0 && targetDirectionRotated.y >= 0)
			enemyAnim.SetBool("up",true);
		else if(targetDirectionRotated.x >= 0 && targetDirectionRotated.y < 0)
			enemyAnim.SetBool("right",true);
		else if(targetDirectionRotated.x <= 0 && targetDirectionRotated.y > 0)
			enemyAnim.SetBool("left",true);
		else if(targetDirectionRotated.x < 0 && targetDirectionRotated.y <= 0)
			enemyAnim.SetBool("down", true);

     }  
 }
 
 function OnTriggerEnter2D(other : Collider2D){
	
	if (other.gameObject.tag == "player") {
		healthBar.SetTrigger("hit");
	}
}