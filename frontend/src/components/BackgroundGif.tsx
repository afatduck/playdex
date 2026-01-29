import BackgroundImage from "../../public/background.gif"

function BackgroundGif() {
  return (
    <img
      src={BackgroundImage}
      alt="PlayDEX Background"
      className="absolute inset-0 w-full h-full object-cover -z-10"
      style={{
        top: '-64px',
        height: 'calc(100vh + 64px)',
      }}
    />
  );
}

export default BackgroundGif;
