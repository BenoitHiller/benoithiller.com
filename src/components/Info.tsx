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
    containerClass: 'bg-rose-50',
    icon: <ExclamationTriangleIcon className="size-6 -mt-2 text-orange-400" />
  },
  focus: {
    containerClass: 'bg-orange-50',
    icon: null
  }
};

type BoxKind = keyof typeof BOX_TYPES;

const InfoBoxIcon: React.FC<{ type: BoxKind }> = ({ type }) => {
  const { icon } = BOX_TYPES[type];
  if (icon) {
    return (
      <div
        role="img"
        className="inline-block not-prose float-right pl-2 max-md:-mr-3 md:-mr-6"
        aria-label={type}
        title={type}
      >
        {icon}
      </div>
    );
  }
};

const Info: React.FC<{ children: React.ReactNode; type?: BoxKind }> = ({
  children,
  type = 'info'
}) => {
  const { containerClass } = BOX_TYPES[type];
  return (
    <div
      className={`info-box expand-to-edge py-6 prose-spacing collapse-before collapse-after ${containerClass}`}
    >
      <div className="group info-box-content">
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
const Focus: React.FC<{ children: React.ReactNode }> = (props) => <Info type="focus" {...props} />;

export { Info, Note, Warning, Focus };
