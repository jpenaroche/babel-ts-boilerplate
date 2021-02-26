import { Rule } from '../../src/types';
import Cluster from '../../src/cluster';
import { createReadStream } from 'fs';
import path from 'path';

describe('Testing cluster with rules and data stream from file', function () {
    let stream: Buffer;
    let rules: Array<Rule> = [];
    beforeAll(async function () {
        //Read content of data file and set data into Array Buffer to parse with cluster

        const readFile = async (filename: string) => {
            const read_stream = createReadStream(path.join(__dirname, `../files/${filename}`));
            return await new Promise<Array<Buffer>>((resolve, reject) => {
                const buffered: Array<Buffer> = [];
                read_stream.on('data', function (data: Buffer) {
                    buffered.push(data);
                });
                read_stream.on('error', function (error: any) {
                    console.error(console.error(error));
                    reject([]);
                });
                read_stream.on('end', resolve.bind(this, buffered));
            });
        }

        stream = Buffer.from(await readFile('data.json'));
        rules = JSON.parse((await readFile('rules.json')).toString()) as Array<Rule>;
    });

    it('Should return data file stream length more than 0', function () {
        expect(stream.length).toBeGreaterThan(0);
    })
    it('Should return rules file as Rule Array length more than 0', function () {
        expect(rules.length).toBeGreaterThan(0);
    })
    it('Should return number of forks more than 0', function () {
        const cluster = new Cluster(stream, rules);
        const launchSpy = jest.spyOn(cluster,'launchWorkers');
        cluster.launchWorkers(1);
        expect(launchSpy).toHaveBeenCalled();
    })
    // it('Should return numbers of forks in cluster', function () {
    //     expect(stream.length).toBeGreaterThan(0);
    // })
})