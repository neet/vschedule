-- DropForeignKey
ALTER TABLE `performers` DROP FOREIGN KEY `performers_organization_id_fkey`;

UPDATE `performers`
INNER JOIN `organizations` ON `performers`.`organization_id` = `organizations`.`id`
SET `organization_id` = `organizations`.`actor_id`;

-- AddForeignKey
ALTER TABLE `performers` ADD CONSTRAINT `performers_organization_id_fkey` FOREIGN KEY (`organization_id`) REFERENCES `organizations`(`actor_id`) ON DELETE SET NULL ON UPDATE CASCADE;

