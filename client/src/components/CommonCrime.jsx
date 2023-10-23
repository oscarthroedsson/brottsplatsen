export default function CommonCrime() {
  return (
    <div className="flex flex-col items-center">
      <div className="xs:w-64 infoContainer centerStart flex-col">
        <div className="mb-4">
          <p className="text-size0-p">Vanligaste brottet i</p>
          <p className="text-size1-p font-heavy-p text-main-color">JUNI</p>
        </div>
        <div>
          <p className="text-size4-p font-heavy-p">Våldtäkt</p>
          <p className="largeP">2087</p>
        </div>
      </div>
      <a href="#" className="text-size0-p text-end highlight px-2">
        Undersök de vanligaste brotten
      </a>
    </div>
  );
}
