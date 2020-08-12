import React from 'react';
import './styles.scss';

export const PrimaryButton = (props: ButtonProps) => {
  const { lable, link, ...rest } = props;
  return (
    <a target="_blank" rel="noreferrer" href={link} {...rest}>
      <button className="bp-primary-button">{lable}</button>
    </a>
  );
};

export const SecondaryButton = (props: ButtonProps) => {
  const { lable, link, ...rest } = props;
  return (
    <a target="_blank" rel="noreferrer" href={link} {...rest}>
      <button className="bp-secondary-button">{lable}</button>
    </a>
  );
};

interface ButtonProps {
  lable: string;
  link: string;
}
