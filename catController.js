#pragma strict

var speed : float = 1.5f;
var cat : Animator;

//var walkComplete : boolean = false;
//var talkComplete : boolean = false;

function Start (){
	cat.SetBool("walking",true);
	cat.SetBool("talking",false);
	cat.SetBool("idle",false);
}

function Update (){	  												
		
    var velocity : Vector2;
   
    velocity = Vector2.right * speed * Time.deltaTime;
    
    if(transform.position.x < 5)
    	transform.position += velocity;
    	
    else if(transform.position.x >= 5){
    	cat.SetBool("walking",false);
    	cat.SetBool("talking",true);
    }
        
}