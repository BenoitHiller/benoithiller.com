import type React from 'react';
import {
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon
} from '@heroicons/react/20/solid';

const BOX_TYPES = {
  info: {
    containerClass: 'bg-sky-50',
    icon: <ExclamationCircleIcon className="size-6 -mt-2 text-sky-300" />
  },
  note: {
    containerClass: 'bg-violet-50',
    icon: <DocumentTextIcon className="size-6 -mt-1 text-purple-400" />
  },
  warning: {
    containerClass: 'bg-orange-50',
    icon: <ExclamationTriangleIcon className="size-6 -mt-2 text-orange-400" />
  }
};

type BoxKind = keyof typeof BOX_TYPES;

const InfoBoxIcon: React.FC<{ type: BoxKind }> = ({ type }) => {
  const { icon } = BOX_TYPES[type];
  return (
    <div className="inline-block not-prose float-right pl-2" aria-label={type} title={type}>
      {icon}
    </div>
  );
};

const Info: React.FC<{ children: React.ReactNode; type?: BoxKind }> = ({
  children,
  type = 'info'
}) => {
  const { containerClass } = BOX_TYPES[type];
  return (
    <div className={`my-4 pt-px px-4 pb-6 rounded-md ${containerClass}`}>
      <div className="infobox-content">
        <InfoBoxIcon type={type} />
        {children}
      </div>
    </div>
  );
};

const Note: React.FC<{ children: React.ReactNode }> = (props) => <Info type="note" {...props} />;
const Warning: React.FC<{ children: React.ReactNode }> = (props) => (
  <Info type="warning" {...props} />
);

export { Info, Note, Warning };
