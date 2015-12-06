#pragma strict

var speed : float = 3f;
var player : Animator;

function Update (){
  
	// Clear current animation, if any
	player.SetBool("left",false);
	player.SetBool("right",false);
	player.SetBool("up",false);
	player.SetBool("down",false);					  												
		
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
        
}