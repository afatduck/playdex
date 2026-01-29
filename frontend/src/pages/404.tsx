function Page404() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <p
        className="font-bold tracking-tighter"
        style={{
          fontFamily: "'Press Start 2P', system-ui",
        }}>
        You didn't catch 'em all... The page you're looking for doesn't exist...
      </p>
    </div>
  );
}

export default Page404;
