import {List as list, Record as record} from 'immutable';
import dayjs, {Dayjs} from 'dayjs';

import {JSObject} from '../types/Common';

/**
 *
 */
export class ImageLinks extends record<{
    smallThumbnail: string;
    thumbnail: string;
}>({
  smallThumbnail: '',
  thumbnail: '',
}) {
  /**
   * @param {JSObject} response
   * @return {ImageLinks} image links
   */
  static fromResponse(response: JSObject) {
    const params = {...response};
    return new ImageLinks(params);
  }
};

/**
 *
 */
export class VolumeInfo extends record<{
    title: string;
    subtitle: string;
    authors: list<string>;
    publisher: string;
    publishedDate: Dayjs;
    description: string;
    imageLinks: ImageLinks;
    previewLink: string;
    infoLink: string;
    canonicalVolumeLink: string;
}>({
  title: '',
  subtitle: '',
  authors: list(),
  publisher: '',
  publishedDate: dayjs(),
  description: '',
  imageLinks: new ImageLinks(),
  previewLink: '',
  infoLink: '',
  canonicalVolumeLink: '',
}) {
  /**
   * @param {JSObject} response
   * @return {VolumeInfo} volume info
   */
  static fromResponse(response: JSObject) {
    const params = {...response};
    params.authors = list(params.authors);
    params.publishedDate = dayjs(params.publishedDate);
    params.imageLinks = ImageLinks.fromResponse(params.imageLinks);
    return new VolumeInfo(params);
  }

  // these getters should not be a member of this class?
  /**
   * @return {string} description with new line
   */
  get descriptionWithNewLine() {
    return this.description.replace('。', '\n');
  }

  /**
   * @return {Dayjs} day
   */
  get publishedDateString() {
    return this.publishedDate.format('YYYY/MM/DD');
  }
};

/**
 *
 */
export class Volume extends record<{
    id: number;
    selfLink: string;
    volumeInfo: VolumeInfo;
}>({
  id: 0,
  selfLink: '',
  volumeInfo: new VolumeInfo(),
}) {
  /**
   * @param {JSObject} response
   * @return {VolumeInfo} volulme info
   */
  static fromResponse(response: JSObject) {
    const params = {...response};
    params.volumeInfo = VolumeInfo.fromResponse(params.volumeInfo);
    return new VolumeInfo(params);
  }
};

/**
 *
 */
export class VolumeList extends record<{
    kind: string;
    totalItems: number;
    items: list<Volume>;
}>({
  kind: '',
  totalItems: 0,
  items: list(),
}) {
  /**
   * @param {JSObject} response
   * @return {VolumeList} volume list
   */
  static fromResponse(response: JSObject) {
    const params = {...response};
    params.items =
        list(params.items.map((item: JSObject) => Volume.fromResponse(item)));
    return new VolumeList(params);
  }
};
