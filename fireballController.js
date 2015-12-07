#pragma strict

enum FireballState { Start, Launch, Flying, Hit };

class Boundary
{
    var xMin : float;
    var xMax : float;
    var yMin : float;
    var yMax : float;
}

var boundary : Boundary; // smaller than the entire map!
var speed : float = 6.0f;
var launchDurationSecs : float = 0.05f;
var shotSpreadDeg : float = 30f;

private var fireball : Animator;
private var state : FireballState = FireballState.Start;
private var launchTime : float = 0.0f;
private var enemy : GameObject;
private var enemyHurt : boolean = false;

function Start () {
	fireball = GetComponent(Animator);
	
	// add an initial randomness to the travel direction
	transform.Rotate(Vector3(0,0,Random.value*shotSpreadDeg - (shotSpreadDeg/2)));
}

function OnTriggerEnter2D(col: Collider2D){
    if(col.gameObject.name == "bahamut"){
        enemy = col.gameObject;
        state = FireballState.Hit;
    }
}

// destroy the fireball once its hit animation is complete
function DestroyFireball(){
	Destroy(this.gameObject);
}

function Update () {
	// if we've flown past the edge of the battle boundary, or started outside
	if(transform.position.x < boundary.xMin || boundary.xMax < transform.position.x || transform.position.y < boundary.yMin || boundary.yMax < transform.position.y){
		DestroyFireball();
		return;		
	}

    fireball.SetBool("fired",false);
    fireball.SetBool("going",false);
    fireball.SetBool("hit",false);
    
    switch(state){
        case FireballState.Start:
            launchTime = Time.time + launchDurationSecs;
            state = FireballState.Launch;
            break;
        case FireballState.Launch:
            fireball.SetBool("fired",true);
            if(Time.time >= launchTime) // begin flight
                state = FireballState.Flying;
            break;
        case FireballState.Flying:
            fireball.SetBool("going",true);
            transform.Translate(Vector3.right * speed * Time.deltaTime); // move the shot relative to its local axes
            break;
        case FireballState.Hit:
            fireball.SetBool("hit",true);
            
            if(!enemyHurt){ // a single fireball can only hurt once before dissipating
                enemy.GetComponent(enemyController).Hurt();
                enemyHurt = true;
            }
            break;
    }
 }