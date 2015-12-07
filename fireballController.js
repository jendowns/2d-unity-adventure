#pragma strict

enum FireballState { Start, Launch, Flying, Hit };

var fireball : Animator;
var speed : float = 1.0f;
var launchDurationSecs : float = 1.0f;

private var state : FireballState = FireballState.Start;
private var launchTime : float = 0.0f;
private var enemy : GameObject;
private var enemyHurt : boolean = false;

function Start () {
    
}

function OnCollisionEnter(col: Collision){
    if(col.gameObject.name == "bahamut"){
        enemy = col.gameObject;
        state = FireballState.Hit;
    }
}

function Update () {
    // update velocity (but not position! will only change if we're in flight)
    
    var velocity : Vector2 = Vector2.right;
    velocity = transform.rotation * velocity; // rotate our velocity vector appropriately
    
    // update animation
    
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
            transform.position += velocity * speed * Time.deltaTime;
            
            // TODO Destroy(this.gameObject) if we've flown past the edge of the game area
            
            break;
        case FireballState.Hit:
            fireball.SetBool("hit",true);
            
            if(!enemyHurt){
                //enemy.GetComponent(enemyController).hurt(20); // TODO I made up the hurt() method!
                enemyHurt = true;
            }
            
            // destroy the fireball once its hit animation is complete
            if (fireball.GetCurrentAnimatorStateInfo(0).normalizedTime > 1 && !fireball.IsInTransition(0)){
                Destroy(this.gameObject);
            }
            break;
    }
 }