interface Props {
  category: string;
  url: string;
}

export const MovieRow: React.FC<Props> = ({ category, url }) => {
  return (
    <div>
      <h2 className="text-white font-bold">{category}</h2>
    </div>
  );
};
