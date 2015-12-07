 #pragma strict

var speed : float = 6f;
var tm : Animator; // animator for TuxedoMask

var captive : GameObject;
var player : GameObject;
 
private var range : float;

function FixedUpdate(){

	if (GameObject.Find("bahamut").GetComponent(enemyController).startBattleScene)
		TuxedoMaskLeaves();
}

function TuxedoMaskLeaves(){
		
		yield WaitForSeconds(.3);
		
		tm.SetBool("right",true);
		
		var velocity : Vector2;
	    velocity = Vector2.right * speed * Time.deltaTime;
	    transform.position += velocity;
	    	
		range = Vector2.Distance(player.transform.position, captive.transform.position);
		
		if(range>15f)
			Destroy(captive); // Tuxedo Mask goes away once out of the camera's view

}