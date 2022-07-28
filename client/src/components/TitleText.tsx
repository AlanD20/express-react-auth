interface Props {
  text: string;
}

const TitleText = ({ text }: Props) => {
  return <h1 className="text-3xl font-bold pb-4 pt-2 capitalize">{text}</h1>;
};
export default TitleText;
