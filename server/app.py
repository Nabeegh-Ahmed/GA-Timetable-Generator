from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
import pandas as pd
import main

@app.route('/')
def hello_world():
    return 'This is my first API call!'

@app.route('/timetable', methods=["GET"])
@cross_origin()
def testpost():
    args = request.args
    off_day = args.get("offDay", default=4, type=int)
    consecutives = args.get("consecutives", default=1, type=int)
    last_class = args.get("lastClass", default=0, type=int)
    first_class = args.get("firstClass", default=0, type=int)
    main.dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    main.COURSES = []
    for i in range(5):
        main.COURSES.append([])
    main.FITNESS_CONDITIONS = []
    main.start = [0, 0, 0, 0, 0, 0]
    main.days = [0, 0, 0, 0, 0, 0]
    
    main.POPULATION = []
    main.BUFFER = []
    
    main.read_excel()
    del main.dayNames[-1]
    main.filter_courses()
    main.combine()
    
    main.api_input(off_day, consecutives, last_class, first_class)
    print("Input Feeded", off_day, consecutives, last_class, first_class)
    main.generate_population()
    main.POPULATION.sort()
    itr = 0
    
    while main.POPULATION[0].fitness_val != 0 and itr < 100:
        print("Iteration: ", itr, "Fitness: ", main.POPULATION[0].fitness_val)
        main.filter_best_fit()
        main.apply_crossover()
        main.apply_mutation()
        main.buffer_to_population()
        main.POPULATION.sort()
        itr += 1
    
    response = {
        "message": ""
    }

    if main.POPULATION[0].fitness_val == 0:
        response["message"] = "Target Reached"
    else:
        response["message"] = "Iteration Limit Reached (Best Samples)"
    
    df_0 = pd.DataFrame(main.POPULATION[0].timetable[0], columns=main.TIME, index=main.dayNames)
    df_1 = pd.DataFrame(main.POPULATION[1].timetable[0], columns=main.TIME, index=main.dayNames)
    df_2 = pd.DataFrame(main.POPULATION[2].timetable[0], columns=main.TIME, index=main.dayNames)

    for i in range(3):
        response["timetable" + str(i)] = {}
        for j in main.dayNames:
            response["timetable" + str(i)][j] = []
    
    
    for timetable in range(3):
        for day in range(len(main.POPULATION[timetable].timetable[0])):
            for course in range(len(main.POPULATION[timetable].timetable[0][day])):
                if len(main.POPULATION[timetable].timetable[0][day][course]) > 0:
                    response["timetable"+str(timetable)][main.dayNames[day]].append([])
                    response["timetable"+str(timetable)][main.dayNames[day]][0].append({
                        "time": main.TIME[course],
                        "name": main.POPULATION[1].timetable[0][day][course],
                    })
    return jsonify(response)
    