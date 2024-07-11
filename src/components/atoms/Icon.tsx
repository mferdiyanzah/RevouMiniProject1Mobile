import React from 'react';
import { View } from 'react-native';
import BellSVG from '../../assets/icons/bell.svg';
import EyeSVG from '../../assets/icons/eye.svg';
import LeftArrowSVG from '../../assets/icons/left-arrow.svg';
import LogoSVG from '../../assets/icons/logo.svg';
import LoveSVG from '../../assets/icons/love.svg';
import PlusSVG from '../../assets/icons/plus.svg';
import QuestionSVG from '../../assets/icons/question.svg';
import DotThreeSVG from '../../assets/icons/three-dots.svg';
import HomeSVG from '../../assets/icons/home.svg';
import ProfileSVG from '../../assets/icons/profile.svg';
import UpArrowSVG from '../../assets/icons/up-arrow.svg';
import CommentSVG from '../../assets/icons/comment.svg';
import ShareSVG from '../../assets/icons/share.svg';

type IconVariant =
  | 'bell'
  | 'question'
  | 'plus'
  | 'eye'
  | 'three-dots'
  | 'logo'
  | 'home'
  | 'profile'
  | 'up-arrow'
  | 'comment'
  | 'share'
  | 'love';

interface IconProps extends React.ComponentProps<typeof View> {
  variant: IconVariant;
}

const IconPath = {
  'left-arrow': <LeftArrowSVG />,
  logo: <LogoSVG />,
  love: <LoveSVG />,
  bell: <BellSVG />,
  question: <QuestionSVG />,
  plus: <PlusSVG />,
  'three-dots': <DotThreeSVG />,
  eye: <EyeSVG />,
  home: <HomeSVG />,
  profile: <ProfileSVG />,
  'up-arrow': <UpArrowSVG />,
  comment: <CommentSVG />,
  share: <ShareSVG />,
};

const Icon = ({ variant, style }: IconProps) => {
  return <View style={style}>{IconPath[variant]}</View>;
};

export default Icon;
