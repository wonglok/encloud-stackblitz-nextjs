import { OrbitControls } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import Head from 'next/head';
import { useEffect } from 'react';
import { ENRuntime, BASEURL_REST } from '../pages-code/ENCloudSDK/ENRuntime';
import { EnvMap } from '../pages-code/EnvMap/EnvMap';
import { Bloom } from '../pages-code/Bloom/Bloom.js';

let getProjectJSON = () => {
  return {
    published: true,
    displayName: 'encloud-stackblitz-nextjs',
    _id: '60aedaf6f7be030009663f23',
    username: 'wonglok831',
    userID: '609b49ad59f39c00098c34ea',
    slug: 'encloud-stackblitz-nextjs',
    created_at: '2021-05-26T23:34:14.239Z',
    updated_at: '2021-05-26T23:34:42.847Z',
    __v: 0,
    largeString:
      '{"_id":"60aedaf6f7be030009663f23","blockers":[{"_id":"_8c0jvqe18jbxdrk5hy","position":[255.2089199661702,-0.0000012207030835043042,-89.75795344163646],"title":"demo.plane"},{"_id":"_736fru14yax62noee4","position":[-226.45059826399637,2.1731023348452482e-14,-97.86782865447015],"title":"demo.sweet"}],"ports":[{"_id":"_e74lbaby0gq7fhti02","type":"input","idx":0,"blockerID":"_8c0jvqe18jbxdrk5hy"},{"_id":"_b8n38umddo5d6e675c","type":"input","idx":1,"blockerID":"_8c0jvqe18jbxdrk5hy"},{"_id":"_jslx9xqxleh0gggoyl","type":"input","idx":2,"blockerID":"_8c0jvqe18jbxdrk5hy"},{"_id":"_03mubgjkc0hmjxxet6","type":"input","idx":3,"blockerID":"_8c0jvqe18jbxdrk5hy"},{"_id":"_zmyokvjucycivikg1y","type":"input","idx":4,"blockerID":"_8c0jvqe18jbxdrk5hy"},{"_id":"_3br5fqmtduyswqgg6a","type":"output","idx":0,"blockerID":"_8c0jvqe18jbxdrk5hy"},{"_id":"_nho42nyh20gzt4c0y8","type":"output","idx":1,"blockerID":"_8c0jvqe18jbxdrk5hy"},{"_id":"_603woen80646v57s6n","type":"output","idx":2,"blockerID":"_8c0jvqe18jbxdrk5hy"},{"_id":"_fsk9t4rh9lud9alj9m","type":"output","idx":3,"blockerID":"_8c0jvqe18jbxdrk5hy"},{"_id":"_boixinuhmcvjmvs6hn","type":"output","idx":4,"blockerID":"_8c0jvqe18jbxdrk5hy"},{"_id":"_yfo9id76ep6dal4ww6","type":"input","idx":0,"blockerID":"_736fru14yax62noee4"},{"_id":"_sb4ckrcjofxsgieo65","type":"input","idx":1,"blockerID":"_736fru14yax62noee4"},{"_id":"_e1fx84a1u2xw2pi8q8","type":"input","idx":2,"blockerID":"_736fru14yax62noee4"},{"_id":"_3c8j0cwjycmq47m5tx","type":"input","idx":3,"blockerID":"_736fru14yax62noee4"},{"_id":"_9bzg9zmo4ukvw6nm53","type":"input","idx":4,"blockerID":"_736fru14yax62noee4"},{"_id":"_syaygond09cxllndgf","type":"output","idx":0,"blockerID":"_736fru14yax62noee4"},{"_id":"_8wb3zo0d1lgezlw34i","type":"output","idx":1,"blockerID":"_736fru14yax62noee4"},{"_id":"_dlerzcn2qy16gpgw7v","type":"output","idx":2,"blockerID":"_736fru14yax62noee4"},{"_id":"_ze9t10t4ykzj15g17w","type":"output","idx":3,"blockerID":"_736fru14yax62noee4"},{"_id":"_ceodn9cvfstwyd5pv5","type":"output","idx":4,"blockerID":"_736fru14yax62noee4"}],"connections":[{"_id":"_1lef5teb3lybvf19hl","input":{"_id":"_e74lbaby0gq7fhti02","type":"input","idx":0,"blockerID":"_8c0jvqe18jbxdrk5hy"},"output":{"_id":"_syaygond09cxllndgf","type":"output","idx":0,"blockerID":"_736fru14yax62noee4"}}],"pickers":[]}'
  };
};

let loadBattriesInFolder = () => {
  let enBatteries = [];
  let reqq = require.context('../pages-code/ENBatteries/', true, /\.js$/);
  let keys = reqq.keys();
  keys.forEach(key => {
    enBatteries.push(reqq(key));
  });

  //
  return enBatteries;
};

function EffectNode({ projectJSON }) {
  let three = useThree();
  useEffect(() => {
    let enRunTime = new ENRuntime({
      projectJSON: projectJSON,
      enBatteries: loadBattriesInFolder(),
      userData: {}
    });

    Object.entries(three).forEach(([key, value]) => {
      enRunTime.mini.set(key, value);
    });

    return () => {
      enRunTime.mini.clean();
    };
  }, []);

  return <group />;
}

export async function getStaticProps(context) {
  let project = getProjectJSON();
  let projectID = project._id;
  let buildTimeCache = await fetch(
    `${BASEURL_REST}/project?action=get-one-of-published`,
    {
      headers: {
        'content-type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({ _id: projectID }),
      method: 'POST',
      mode: 'cors'
    }
  )
    //
    .then(res => {
      return res.json();
    });

  return {
    props: {
      buildTimeCache
    } // will be passed to the page component as props
  };
}

export default function Home({ buildTimeCache }) {
  return (
    <div className={'h-full w-full'}>
      <Head>
        <title>Your Brand New Site</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Canvas>
        {/*  */}
        <EffectNode projectJSON={buildTimeCache || getProjectJSON()} />

        {/*  */}
        <directionalLight position={[10, 10, 10]} intensity={0.2} />

        {/*  */}
        <ambientLight intensity={0.2} />

        {/*  */}
        <EnvMap />

        {/*  */}
        <Bloom />

        {/* <Sphere position-x={-1} args={[1, 25, 25]}>
          <meshStandardMaterial
            metalness={0.9}
            roughness={0.1}
          ></meshStandardMaterial>
        </Sphere>

        <Box position-x={1} args={[2, 2, 2, 25, 25, 25]}>
          <meshStandardMaterial
            metalness={0.9}
            roughness={0.1}
          ></meshStandardMaterial>
        </Box> */}

        <OrbitControls />
      </Canvas>
    </div>
  );
}
