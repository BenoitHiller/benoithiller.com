import type React from 'react';

const BOX_TYPES = {
  info: {
    containerClass: 'bg-sky-50',
    headerClass: 'text-sky-200',
    header: 'Info'
  },
  note: {
    containerClass: 'bg-violet-50',
    headerClass: 'text-purple-200',
    header: 'Note'
  },
  warning: {
    containerClass: 'bg-orange-50',
    headerClass: 'text-orange-200',
    header: 'Warning!'
  }
};

type BoxKind = keyof typeof BOX_TYPES;

const InfoBoxHeader: React.FC<{ type: BoxKind }> = ({ type }) => {
  const { headerClass, header } = BOX_TYPES[type];
  return <div className={`font-bold text-sm/8 ${headerClass}`}>{header}</div>;
};

const Info: React.FC<{ children: React.ReactNode; type?: BoxKind }> = ({
  children,
  type = 'info'
}) => {
  const { containerClass } = BOX_TYPES[type];
  return (
    <div className={`pt-2 px-4 pb-6 rounded-md ${containerClass}`}>
      <InfoBoxHeader type={type} />
      <div className="infobox-content">{children}</div>
    </div>
  );
};

const Note: React.FC<{ children: React.ReactNode }> = (props) => <Info type="note" {...props} />;
const Warning: React.FC<{ children: React.ReactNode }> = (props) => (
  <Info type="warning" {...props} />
);

export { Info, Note, Warning };
