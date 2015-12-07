#pragma strict

var speed : float = 3f;
var player : Animator;
var fireballPrefab : GameObject;
var fireballShotsPerSec : float = 2;

var speechFinalePrefab : GameObject;

private var shotTime : float = 0.0f;
private var facing : Vector2 = Vector2.down;

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
        facing = Vector2.right;
        velocity = Vector2.right * speed * Time.deltaTime;
    }
    
    else if(h<0){
        player.SetBool("left",true);
        facing = Vector2.left;
        velocity = Vector2.left * speed * Time.deltaTime;
    }
    
    if(v<0){
        player.SetBool("down",true);
        facing = Vector2.down;
        velocity = Vector2.down * speed * Time.deltaTime;
    }
    
    else if(v>0){
        player.SetBool("up",true);
        facing = Vector2.up;
        velocity = Vector2.up * speed * Time.deltaTime;
    }
    
    transform.position += velocity;
    
    if(Input.GetButton("Jump")){
    	player.SetBool("attacking",true);
    	ShootFireball(facing);
    }
        
}

function ShootFireball(direction : Vector2) {

	if(Time.time >= shotTime){
		// rotate the shot to travel in the direction of "direction"
		var rotationAngle : float    = Mathf.Atan2(direction.y, direction.x);
		var rotationAngleDeg : float = 360 * rotationAngle / (2*Mathf.PI);
		var rotation : Quaternion = Quaternion.AngleAxis(rotationAngleDeg, Vector3.forward);
		
		var position : Vector3 = transform.position + Vector3(direction.x, direction.y, 0);
	
		var fireball : GameObject = Instantiate(fireballPrefab, position, rotation);
		// the rest of the fireball's animation + movement is in fireballController.js
	
		shotTime = Time.time + (1/fireballShotsPerSec);
	}
}

function OnEnemyDefeat(){
	var canvasTransform : Transform = transform.Find('Canvas');
	
	var speech : GameObject = Instantiate(speechFinalePrefab) as GameObject;
	speech.transform.SetParent(canvasTransform, false);
}


