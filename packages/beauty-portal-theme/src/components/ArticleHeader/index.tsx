import React, { FunctionComponent, useState } from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames';
import SocialMenu from '../SocialMenu';
import { getYouTubeId } from '../../helpers/youtube';
import { urlFor } from '../../helpers/imageUrl';
import { ReactComponent as Skill } from '../../images/icons/skill.svg';
import { ReactComponent as Youtube } from '../../images/icons/youtube.svg';
import { ReactComponent as IconTime } from '../../images/icons/time.svg';
import { ReactComponent as Loader } from '../../images/icons/loader.svg';
import './styles.scss';

const ArticleHeader: FunctionComponent<ArticleHeaderInterface> = ({
  article,
  type,
  socialLinks,
  playLabel,
}) => {
  const [showVideo, setShowVideo] = useState(false);
  const [videoSourceUrl, setVideoSourceUrl] = useState('');
  const [videoLoading, setVideoLoading] = useState(false);
  const {
    headline,
    subheading,
    heroImage,
    heroVideo,
    author,
    skillLevel,
    time,
    _rawHeroImage,
    _rawHeroVideo,
    _type,
  } = article;

  const playVideo = (event: any) => {
    setVideoLoading(true);
    setVideoSourceUrl(
      `https://www.youtube.com/embed/${getYouTubeId(
        event.currentTarget.dataset.url
      )}?autoplay=1`
    );
    setShowVideo(true);
  };

  const onFrameLoad = () => {
    setVideoLoading(false);
  };

  const renderVideoThumbnail = (_rawHeroImage, alt) => {
    return (
      <>
        <link
          rel="preload"
          as="image"
          href={`${urlFor(_rawHeroImage)
            .width(665)
            .height(374)
            .quality(80)
            .fit('max')
            .auto('format')
            .url()
            .toString()}`}
        />

        <figure>
          <picture
            className="bp-image__placeholder"
            style={{
              paddingTop: `56.25%`,
              background: `url(${_rawHeroImage.asset.metadata.lqip})`,
              backgroundSize: 'cover',
            }}
          >
            <source
              media="screen and (min-width: 1025px)"
              srcSet={`${urlFor(_rawHeroImage)
                .width(665)
                .height(374)
                .quality(80)
                .fit('max')
                .auto('format')
                .url()
                .toString()}`}
            />
            <source
              media="screen and (min-width: 560px)"
              srcSet={`${urlFor(_rawHeroImage)
                .width(436)
                .height(245)
                .quality(80)
                .fit('max')
                .auto('format')
                .url()
                .toString()}`}
            />
            <source
              media="screen and (min-width: 320px)"
              srcSet={`${urlFor(_rawHeroImage)
                .width(414)
                .height(232)
                .fit('max')
                .auto('format')
                .url()
                .toString()}`}
            />
            <img
              src={urlFor(_rawHeroImage)
                .width(436)
                .height(245)
                .quality(80)
                .fit('max')
                .auto('format')
                .url()}
              alt={alt}
            />
          </picture>
        </figure>
      </>
    );
  };

  return (
    <div className="bp-articleHeader_header">
      <h1
        className={classNames(
          'bp-articleHeader_title',
          type === 'gallery' ? 'txt-center' : null
        )}
      >
        {headline}
      </h1>
      <p
        className={classNames(
          'bp-articleHeader_subTitle',
          type === 'gallery' ? 'txt-center' : null
        )}
      >
        {subheading}
      </p>
      <div className="bp-articleHeader_content">
        <div className="bp-articleHeader_content-info">
          {author && author.name && (
            <div className="bp-articleHeader_author">
              <Link to={author.path ? author.path : author.slug.current}>
                <span className="bp-articleHeader_link">{author.name}</span>
              </Link>
            </div>
          )}
          <span className="divider">|</span>
          {(article.publishedAt || article._updatedAt) && (
            <span>{article.publishedAt || article._updatedAt}</span>
          )}
        </div>
        <SocialMenu links={socialLinks} />
      </div>
      {/* TODO: Use generic `Video` component for hero video to avoid duplicate code  */}
      {!(_type === 'galleryArticle') && (
        <div className="bp-articleHeader_image">
          {!showVideo &&
            !heroVideo &&
            renderVideoThumbnail(_rawHeroImage, _rawHeroImage.alt)}
          {!showVideo && heroVideo && !videoLoading && (
            <>
              {heroVideo.heroImage
                ? renderVideoThumbnail(
                    _rawHeroVideo.heroImage,
                    heroVideo.heroImage.alt
                  )
                : renderVideoThumbnail(_rawHeroImage, _rawHeroImage.alt)}
              <button
                type="button"
                className="icon-video"
                onClick={playVideo}
                data-url={heroVideo.url}
              >
                <Youtube />
                <span className="srOnly">{playLabel}</span>
              </button>
            </>
          )}
          {videoLoading && (
            <div className="bp-preloader">
              <Loader />
            </div>
          )}
          {showVideo && (
            <iframe
              width="560"
              height="399"
              src={videoSourceUrl}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={onFrameLoad}
            ></iframe>
          )}
        </div>
      )}
      {(skillLevel || time) && (
        <div className="bp-articleHeader_tutorial">
          {time && (
            <div className="bp-articleHeader_tutorial-info">
              <div>
                <strong>Time</strong>
                <span>{time} mins</span>
              </div>
              <div className="icon">
                <IconTime className="active" />
              </div>
            </div>
          )}
          {skillLevel && (
            <div className="bp-articleHeader_tutorial-info">
              <div>
                <strong>Skill</strong>
                <span>{skillLevel}</span>
              </div>
              <div className="icon skill">
                <Skill
                  className={classNames(skillLevel === 'easy' && 'active')}
                />
                <Skill
                  className={classNames(skillLevel === 'medium' && 'active')}
                />
                <Skill
                  className={classNames(skillLevel === 'difficult' && 'active')}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

interface ArticleHeaderInterface {
  article: any;
  type: any;
  socialLinks: any;
  playLabel?: string;
}

export default ArticleHeader;
