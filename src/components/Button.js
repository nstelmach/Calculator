function Button(props) {
  return (
    <button
      onClick={props.onClick}
      className={props.className}
      id={props.id}
      value={props.value}
    >
      {props.name}
    </button>
  );
}

export default Button;
