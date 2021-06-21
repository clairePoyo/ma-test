type EmptyStateProps = {
  text: string;
};

const EmptyState = ({ text }: EmptyStateProps) => (
  <div className="empty-state">
    <p>{text}</p>
  </div>
);

export default EmptyState;
