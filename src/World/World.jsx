import React from 'react';
import useGame from './stores/useGame';
import Wall from './structures/Walls';
import RotatingWall from './structures/rotatingWall';
import Checkpoint from './structures/Checkpoints';
import Endpoint from './structures/Endpoint';
import BlockAxe from './structures/BlockAxe';



const World = () => {
    const gamemode = useGame((state) => state.gamemode);

    return (
        
        <>
            {/* Render Checkpoints only if gamemode is not "easy" */}
            {gamemode == 'easy' && (
            <>
                <Checkpoint position={[0, 7.5, -139]} />       
                <Checkpoint position={[-4, 17.2, -280]} />
                <Checkpoint position={[0, 25.8, -342]} />       
                <Checkpoint position={[3.5, 55.5, -231]} />    
                <Checkpoint position={[5.5, 58.5, -163]} />     
            </>
            )}

            {gamemode == 'normal' && (
            <>
                <Checkpoint position={[-4, 17.2, -280]} />
                <Checkpoint position={[5.5, 58.5, -163]} />     
            </>
            )}

            {gamemode == 'hard' && (
            <>
                <Wall position={[-1, -0.5, -4]} args={[0.5, 0.5, 0.5]} color="red" delay={0}/>
                <Wall position={[-1, -0.5, -37]} args={[0.5, 0.5, 0.5]} color="red" delay={0.5}/>
                <Wall position={[-1, -0.5, -40]} args={[0.5, 0.5, 2.5]} color="red" delay={1}/>
                <Wall position={[-1, -0.5, -43]} args={[0.5, 0.5, 0.5]} color="red" delay={1.5}/>
                <Wall position={[-1, -0.5, -46]} args={[0.5, 0.5, 0.5]} color="red" delay={2}/>
                
                <Wall position={[-1, 3.5, -82]} args={[0.5, 0.5, 0.5]} color="red" delay={2}/>
                <Wall position={[-1, 3.5, -85]} args={[0.5, 0.5, 0.5]} color="red" delay={1.5}/>
                <Wall position={[-1, 3.5, -88]} args={[0.5, 0.5, 0.5]} color="red" delay={1}/>
                <Wall position={[-1, 3.5, -91]} args={[0.5, 0.5, 0.5]} color="red" delay={0.5}/>
                
                <Wall position={[-1, 7.8, -136]} args={[0.5, 0.5, 0.5]} color="red" delay={2}/>
                <Wall position={[-1, 7.8, -139]} args={[0.5, 0.5, 0.5]} color="red" delay={1.5}/>
                <Wall position={[-1, 7.8, -142]} args={[0.5, 0.5, 0.5]} color="red" delay={1}/>

                <Wall position={[6, 9, -180]} args={[0.5, 0.5, 2.5]} color="red" delay={0}/>
                <Wall position={[6, 9, -184]} args={[0.5, 0.5, 2.5]} color="red" delay={1}/>

                <Wall position={[-0.5, 13, -222]} args={[0.5, 0.5, 1]} color="red" delay={2.5}/>
                <Wall position={[-0.5, 13, -225]} args={[0.5, 0.5, 0.5]} color="red" delay={2}/>
                <Wall position={[-0.5, 13, -228]} args={[0.5, 0.5, 0.5]} color="red" delay={1.5}/>
                <Wall position={[-0.5, 13, -231]} args={[0.5, 0.5, 0.5]} color="red" delay={1}/>

                <Wall position={[-5, 17.5, -275]} args={[0.5, 0.5, 2.5]} color="red" delay={0}/>

                <Wall position={[-2, 42.5, -306]} args={[0.5, 0.5, 2.5]} color="red" delay={1}/>

                <Wall position={[-4, 48.5, -290]} args={[0.5, 0.5, 2.5]} color="red" delay={0}/>

                {/* <BlockAxe position={[3.8, 56, -155]} args={[0.5, 4.5, 0.5]} color="blue" delay={0}/>
                <RotatingWall position={[3.8, 56, -152.5]} args={[0.5, 4.5, 0.5]} color="blue" delay={0}/>
                <RotatingWall position={[3.8, 56, -150]} args={[0.5, 4.5, 0.5]} color="blue" delay={0}/>
                <RotatingWall position={[3.8, 56, -147.5]} args={[0.5, 4.5, 0.5]} color="blue" delay={0}/>

                <RotatingWall position={[3.8, 54.5, -142]} args={[0.1, 2, 0.1]} color="blue" delay={0}/>
                <RotatingWall position={[3.8, 54.5, -140]} args={[0.1, 2, 0.1]} color="blue" delay={0}/>
                <RotatingWall position={[3.8, 54.5, -137]} args={[0.1, 2, 0.1]} color="blue" delay={0}/>
                <RotatingWall position={[3.8, 54.5, -134]} args={[0.1, 2, 0.1]} color="blue" delay={0}/>

                <RotatingWall position={[4, 52, -125.5]} args={[0.1, 3, 0.1]} color="blue" delay={0}/>

                <RotatingWall position={[3.8, 70, -64]} args={[0.1, 3, 0.1]} color="blue" delay={0}/>
                <RotatingWall position={[3.8, 70, -62]} args={[0.1, 3, 0.1]} color="blue" delay={0}/> */}
            </>
            )}

            <Endpoint position={[0, 58.2, -17.5]} />     

        </>    
    );
};

export default World;
