#pragma strict

var speed : float = 3f;
var player : Animator;
var fireballPrefab : GameObject;
var fireball : GameObject;

function Update (){
  
	// Clear current animation, if any
	player.SetBool("left",false);
	player.SetBool("right",false);
	player.SetBool("up",false);
	player.SetBool("down",false);
	player.SetBool("attacking",false);					  												
		
    var h : float = Input.GetAxisRaw("Horizontal");
    var v : float = Input.GetAxisRaw("Vertical");
    var velocity : Vector2;
    
    if(h>0){
        player.SetBool("right",true);
        velocity = Vector2.right * speed * Time.deltaTime;
    }
    
    else if(h<0){
        player.SetBool("left",true);
        velocity = Vector2.left * speed * Time.deltaTime;
    }
    
    if(v<0){
        player.SetBool("down",true);
        velocity = Vector2.down * speed * Time.deltaTime;
    }
    
    else if(v>0){
        player.SetBool("up",true);
        velocity = Vector2.up * speed * Time.deltaTime;
    }
    
    transform.position += velocity;
    
    if(Input.GetButton("Jump")){
    	player.SetBool("attacking",true);
    	ShootFireball();
    }
        
}

function ShootFireball() {
	
	fireball = Instantiate(fireballPrefab, transform.position, transform.rotation);
	// the rest of the fireball's animation + movement is in fireballController.js

}



