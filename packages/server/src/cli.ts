import { createConnection } from './db';
import { groups } from './utils/groups';
import { Team } from './entity/team';
import { Performer } from './entity/performer';

const main = async () => {
  const connection = await createConnection();

  for (const group of groups) {
    const team = new Team();

    try {
      team.id = group.id;
      team.name = group.name;

      const members = [];

      for (const streamerId of group.streamerIds) {
        const performer = await connection
          .getRepository(Performer)
          .findOne({ id: streamerId });

        if (!performer) throw new Error(`Invalid id ${streamerId}`);

        members.push(performer);
      }

      team.members = members;
      await connection.manager.save(team);

      // eslint-disable-next-line no-console
      console.log(
        `${group.name} has been saved with ids ${team.members
          .map(member => member.id)
          .join()}`,
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(error.toString());
      continue;
    }
  }

  process.exit(0);
};

main();
