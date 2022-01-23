import dayjs from 'dayjs';
import * as uuid from 'uuid';

import { MediaAttachment } from '../entities/MediaAttachment';
import { MediaAttachmentFilename } from '../entities/MediaAttachment/MediaAttachmentFilename';
import { Organization } from '../entities/Organization';
import { OrganizationName } from '../entities/Organization/OrganizationName';
import { Url } from '../entities/Url';
import { Uuid } from '../entities/Uuid';

export const organizationFixture = Organization.from({
  id: Uuid.from(uuid.v4()),
  name: OrganizationName.from('にじさんじ'),
  url: Url.from('https://example.com/'),
  avatar: MediaAttachment.from({
    id: Uuid.from(uuid.v4()),
    blur: Buffer.from('blur'),
    createdAt: dayjs(),
    updatedAt: dayjs(),
    filename: MediaAttachmentFilename.from('avatar.png'),
  }),
});
