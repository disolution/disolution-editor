import { spring } from 'react-motion';

const fadeConfig = { stiffness: 120, damping: 22 };
const popConfig = { stiffness: 360, damping: 15 };
const slideConfig = { stiffness: 400, damping: 20 };

function mapStyles({ opacity, offset, scale }) {
  let m = {};
  if(opacity < 1) {
    m = { ...m, ...{
      opacity,
      position: 'absolute',
      width: '100%',
      height: '100%'
    } };
  }
  if(offset && offset !== 0) {
    m = { ...m, ...{
      transform: `translateX(${offset}%)`
    } };
  }
  if(scale && scale !== 1) {
    m = { ...m, ...{
      transform: `scale(${scale})`
    } };
  }
  return m;
}

const none = {
  atEnter: {
    opacity: 1
  },
  atLeave: {
    opacity: 0
  },
  atActive: {
    opacity: 1
  },
  mapStyles
};

const fade = {
  atEnter: {
    opacity: 0
  },
  atLeave: {
    opacity: spring(0, fadeConfig)
  },
  atActive: {
    opacity: spring(1, fadeConfig)
  },
  mapStyles
};

const pop = {
  atEnter: {
    scale: 0.6,
    opacity: 0
  },
  atLeave: {
    scale: spring(0.6, popConfig),
    opacity: 0
  },
  atActive: {
    scale: spring(1, popConfig),
    opacity: 1
  },
  mapStyles
};

const slideLeft = {
  atEnter: {
    opacity: 0,
    offset: 100
  },
  atLeave: {
    opacity: 0,
    offset: spring(-100, slideConfig)
  },
  atActive: {
    opacity: 1,
    offset: spring(0, slideConfig)
  },
  mapStyles
};

const slideRight = {
  atEnter: {
    opacity: 0,
    offset: -100
  },
  atLeave: {
    opacity: 0,
    offset: spring(100, slideConfig)
  },
  atActive: {
    opacity: 1,
    offset: spring(0, slideConfig)
  },
  mapStyles
};

export default { none, fade, pop, slideLeft, slideRight };
