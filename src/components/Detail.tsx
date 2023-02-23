type DetailProps = {
  header: String;
  information: String;
};

function Detail({ header, information }: DetailProps) {
  return (
    <p>
      <b>{header}:</b> <span>{information}</span>
    </p>
  );
}
export default Detail;
