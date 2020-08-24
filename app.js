document.addEventListener('DOMContentLoaded', ()=>{
    const runner = document.querySelector('.runner')
    const grid = document.querySelector('.grid')
    const alert = document.getElementById('alert')
    const score = document.getElementById('score')
    const startAgain = document.getElementById('startAgain')
    let gravity = 0.9
    let Score = 0
    let isgameOver = false
    let isJumping = false
    
    //keyUp function
    function control(e){
        if(e.keyCode === 32){
            if(isJumping == false){
                jump()  
                isJumping == true
            }
        }
    }
    document.addEventListener('keyup', control)
    
    //jump()
    let position = 0
    function jump(){
        let count = 0
        
        
         function playSound(sampleName){
                var sample = document.getElementById(sampleName)
                sample.play()
            }
            window.addEventListener('keydown', function(event){
                var k = event.keyCode
                if(k === 32)playSound('Tab')
                if(isgameOver==true)playSound('GmOver')
            })
        
        
        let uptimerId = setInterval(function(){
            if(count === 15){
                clearInterval(uptimerId)
                let downtimerId = setInterval(function(){
                    position -= 5
                    count--
                    position = position*gravity
                    runner.style.bottom = position + 'px'
                    
                    if(count === 0){ 
                        isJumping == false
                        clearInterval(downtimerId)
                    }
                }, 20)
            }
            count++
            position +=25
            position = position*gravity
            runner.style.bottom = position + 'px'
        },20)
    }
    //generate obstacle
    function generateObstacle(){
        let randomNo = Math.random()*4000
        let obstaclePos = 1000
        const obstacle = document.createElement('div')
        if(!isgameOver)obstacle.classList.add('ObstacleClass')
        grid.appendChild(obstacle)
        obstacle.style.left=obstaclePos + 'px';
        let lefttimerId = setInterval(function(){
                if(obstaclePos==0){
                    obstacle.style.opacity=0
                }
                if(obstaclePos > 0 && obstaclePos < 60 && position < 60){
                    isgameOver = true
                    grid.innerHTML = 'Game Over'+'<br> Your Score is : '+Score
                    grid.classList.add('grid')
                    startAgain.style.display="block"
                    clearInterval(lefttimerId)
                }
            obstaclePos -=10
            obstacle.style.left=obstaclePos + 'px'
        },25)
        if(!isgameOver){
            Score = Score+5
            score.innerHTML = Score
            setTimeout(generateObstacle,randomNo)
        }
    }
    generateObstacle()
})