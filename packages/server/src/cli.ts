import { createConnection } from './db';
import { teams } from './utils/teams';
import { Team } from './entity/team';
import { Performer } from './entity/performer';

const main = async () => {
  const connection = await createConnection();

  for (const teamData of teams) {
    const team = new Team();

    try {
      team.id = teamData.id;
      team.name = teamData.name;

      const members = [];

      for (const performerId of teamData.performerIds) {
        const performer = await connection
          .getRepository(Performer)
          .findOne({ id: performerId });

        if (!performer) throw new Error(`Invalid id ${performerId}`);

        members.push(performer);
      }

      team.members = members;
      await connection.manager.save(team);

      // eslint-disable-next-line no-console
      console.log(
        `${team.name} has been saved with ids ${team.members
          .map((member) => member.id)
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
