import dotsImg from '../assets/dots.png';

export default function DotPattern({ position }) {
  return (
    <img
      src={dotsImg}
      alt=""
      className={`dot-pattern dot-pattern-${position}`}
    />
  );
}
