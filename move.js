#pragma strict

enum Sailor_State { Standing, Walking, Ascending, Descending }

var speed : float = 1f;
var jump_speed : float = 0.5f;
var jump_duration_secs : float = 0.25f;

var anim_Moon : Animator;
var anim_Mercury : Animator;
var anim_Neptune : Animator;

var jump_time : float[];
var states : Sailor_State[];
var animators : Animator[];
var sailors : GameObject[];

function Start (){
	animators = new Animator[3];
	animators[0] = anim_Moon;
	animators[1] = anim_Mercury;
	animators[2] = anim_Neptune;
	
	sailors = new GameObject[3];
	sailors[0] = GameObject.Find("Moon");
	sailors[1] = GameObject.Find("Mercury");
	sailors[2] = GameObject.Find("Neptune");
	
	states = new Sailor_State[3];
	states[0] = Sailor_State.Standing;
	states[1] = Sailor_State.Standing;
	states[2] = Sailor_State.Standing;

	jump_time = new float[3];
	jump_time[0] = 0;
	jump_time[1] = 0;
	jump_time[2] = 0;
}

function Update (){
    var sailor_name = '';
    
    var jump_velocity : Vector2;
	jump_velocity = new Vector2(0,jump_speed*Time.deltaTime);
  
    for(var i=0; i < sailors.length; i++){
      
      sailor_name = sailors[i].name;
  
      switch(states[i]){
        case Sailor_State.Standing:
        	// Clear current animation, if any
			animators[i].SetBool("direction_left",false);
			animators[i].SetBool("direction_right",false);
			animators[i].SetBool("direction_up",false);
			animators[i].SetBool("direction_down",false);

			if(Input.GetButton(sailor_name + "Jump")){
				states[i] = Sailor_State.Ascending;
				jump_time[i] = Time.time + jump_duration_secs; // set an end time in the future for the ascent
			}
			else if((Input.GetAxisRaw("Horizontal") != 0) || (Input.GetAxisRaw("Vertical") != 0)){
				states[i] = Sailor_State.Walking;
			}
			break;
        case Sailor_State.Walking:
        	
			if(Input.GetButton(sailor_name + "Jump")){
				states[i] = Sailor_State.Ascending;
				jump_time[i] = Time.time + jump_duration_secs; // set an end time in the future for the ascent
			}
        	else if((Input.GetAxisRaw("Horizontal") != 0) || (Input.GetAxisRaw("Vertical") != 0)){
	        	
				animators[i].SetBool("direction_left",false);
				animators[i].SetBool("direction_right",false);
				animators[i].SetBool("direction_up",false);
				animators[i].SetBool("direction_down",false);
					
				var h : float = Input.GetAxisRaw("Horizontal");
				var v : float = Input.GetAxisRaw("Vertical");
				
				var velocity : Vector2;

				if(h>0){
					animators[i].SetBool("direction_right",true);
					velocity = Vector2.right * speed * Time.deltaTime;
					// Debug.Log("moving right: "+sailors[i]);
				}
				else if(h<0){
					animators[i].SetBool("direction_left",true);
					velocity = Vector2.left * speed * Time.deltaTime;
					// Debug.Log("moving left: "+sailors[i]);
				}
				
				if(v<0){
					animators[i].SetBool("direction_down",true);
					velocity = Vector2.down * speed * Time.deltaTime;
					// Debug.Log("moving down: "+sailors[i]);
				}
				
				else if(v>0){
					animators[i].SetBool("direction_up",true);
					velocity = Vector2.up * speed * Time.deltaTime;
					// Debug.Log("moving up: "+sailors[i]);
				}
				var velocity3 : Vector3 = new Vector3(velocity.x,velocity.y,0);
				sailors[i].transform.position += velocity3;
			}
			else {
				states[i] = Sailor_State.Standing;
			}
			break;
          
        case Sailor_State.Ascending:
			animators[i].SetBool("direction_left",false);
			animators[i].SetBool("direction_right",false);
			animators[i].SetBool("direction_up",false);
			animators[i].SetBool("direction_down",false);
			
			//Debug.Log("Ascending: " + Time.time);
			
			if(Time.time < jump_time[i]){ // if not done jumping
				sailors[i].transform.position += new Vector3(0,jump_velocity.y,0);
			}
			else { // start descent
				states[i] = Sailor_State.Descending;
				jump_time[i] = Time.time + jump_duration_secs; // set an end time for the descent
			}
			break;
          
        case Sailor_State.Descending:
    		animators[i].SetBool("direction_left",false);
			animators[i].SetBool("direction_right",false);
			animators[i].SetBool("direction_up",false);
			animators[i].SetBool("direction_down",false);
        	//Debug.Log("Descending: " + Time.time);
			if(Time.time < jump_time[i]){
				sailors[i].transform.position += new Vector3(0,-jump_velocity.y,0); 
			}
			else { // finished descending, transition to standing state
				states[i] = Sailor_State.Standing;
			}
			break;
      }
   }
}